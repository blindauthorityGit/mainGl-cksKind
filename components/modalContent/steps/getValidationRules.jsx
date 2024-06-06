const getValidationRules = (category, step) => {
    const babyAndKleinkindRules = {
        1: (formData) => !!formData.date,
        2: (formData) => formData.twins && formData.siblings && formData.birthDate,
        3: (formData) => formData.name && formData.wohnort && formData.email && formData.phone,
        4: (formData) => formData,
        5: (formData) => formData,
    };

    const defaultRules = {
        1: (formData) => !!formData.date,
        2: (formData) => formData.name && formData.wohnort && formData.email && formData.phone,
        3: (formData) => formData, // Add more rules as needed
        4: (formData) => formData,
    };

    if (category === "Baby & Kleinkind") {
        return babyAndKleinkindRules[step];
    } else {
        return defaultRules[step];
    }
};

export default getValidationRules;
