const getValidationRules = (category, step, anfrage) => {
    const babyAndKleinkindRules = {
        1: (formData) => anfrage || !!formData.date,
        2: (formData) => formData.siblings && formData.birthDate,
        3: (formData) => formData.name && formData.email,
        4: (formData) => formData,
        5: (formData) => formData,
        6: (formData) => formData,
    };

    const defaultRules = {
        1: (formData) => !!formData.produkt || !!formData.date,
        2: (formData) => formData.name && formData.email,
        3: (formData) => formData, // Add more rules as needed
        4: (formData) => formData,
        5: (formData) => formData,
    };

    if (category === "Baby & Kleinkind") {
        return babyAndKleinkindRules[step];
    } else {
        return defaultRules[step];
    }
};

export default getValidationRules;
