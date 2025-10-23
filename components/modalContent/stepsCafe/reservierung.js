export const DEFAULT_MAX_SEATS = 20;

export function mergeDayConfig(cfg) {
    if (!cfg) return { maxSeats: DEFAULT_MAX_SEATS, windows: [], arrivalHint: undefined };
    return {
        maxSeats: cfg.maxSeats ?? DEFAULT_MAX_SEATS,
        windows: (cfg.windows || [])
            .filter((w) => w.enabled !== false)
            .map((w) => ({
                start: w.start, // "09:00"
                end: w.end, // "10:30"
                label: w.label || `${w.start}–${w.end}`,
                enabled: w.enabled !== false,
            })),
        arrivalHint: cfg.arrivalHint,
    };
}

export function generateTimeOptions(windows = [], stepMinutes = 15) {
    const out = [];
    for (const w of windows) {
        const startMin = toMinutes(w.start);
        const endMin = toMinutes(w.end);
        for (let m = startMin; m <= endMin; m += stepMinutes) {
            out.push(fromMinutes(m));
        }
    }
    return Array.from(new Set(out));
}

export function validateReservation(form, dayConfig, capacity, { step = 99 } = {}) {
    const e = {};
    const maxSeats = capacity?.maxSeats ?? dayConfig?.maxSeats ?? DEFAULT_MAX_SEATS;
    const reserved = capacity?.reservedSeats || 0;
    const remaining = Math.max(0, maxSeats - reserved);

    if (step >= 1) {
        if (!form.date) e.date = "Bitte wähle ein Datum.";
        if (dayConfig && (dayConfig.windows || []).length === 0)
            e.date = e.date || "Für dieses Datum sind keine Zeitfenster aktiv.";
    }
    if (step >= 2) {
        if (!Number.isFinite(form.seatsCount) || form.seatsCount < 1)
            e.seatsCount = "Mindestens 1 Sitzplatz erforderlich.";
        if (form.seatsCount > remaining) e.seatsCount = `Nur noch ${remaining} Sitzplätze verfügbar.`;
        if (form.babiesCount < 0) e.babiesCount = "Ungültige Anzahl.";
    }
    if (step >= 3) {
        if (!form.arrivalTime) e.arrivalTime = "Bitte Ankunftszeit wählen.";
        if (!form.nameFirst?.trim()) e.nameFirst = "Bitte Vornamen angeben.";
        if (!form.nameLast?.trim()) e.nameLast = "Bitte Nachnamen angeben.";
        if (!isValidEmail(form.email)) e.email = "Bitte gültige E-Mail eingeben.";
    }
    return e;
}

function isValidEmail(s = "") {
    return /.+@.+\..+/.test(String(s).toLowerCase());
}

function toMinutes(hhmm) {
    const [h, m] = String(hhmm).split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
}

function fromMinutes(mins) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
