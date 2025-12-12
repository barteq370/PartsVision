export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[0-9]{9}$/;
export const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
export const yearRegex = /^(19|20)\d{2}$/;


export const validateEmail = (email: string) => {
    if (!email.trim()) return "Email jest wymagany.";
    if (!emailRegex.test(email)) return "Niepoprawny format email.";
    return "";
};

export const validatePassword = (pass: string) => {
    if (!pass.trim()) return "Hasło jest wymagane.";
    if (pass.length < 6) return "Hasło musi mieć minimum 6 znaków.";
    return "";
};

export const validateConfirmPassword = (pass: string, confirm: string) => {
    if (!confirm.trim()) return "Powtórz hasło.";
    if (pass !== confirm) return "Hasła muszą być identyczne.";
    return "";
};

export const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Telefon jest wymagany.";
    if (!phoneRegex.test(phone)) return "Telefon musi mieć 9 cyfr.";
    return "";
};

export const validateName = (name: string) => {
    if (!name.trim()) return "To pole jest wymagane.";
    if (name.length < 3) return "Imię i nazwisko musi mieć min. 3 znaki.";
    return "";
};

export const validateVIN = (vin: string) => {
    if (!vin.trim()) return "VIN jest wymagany.";
    if (!vinRegex.test(vin)) return "VIN musi mieć 17 znaków i być zgodny z normą.";
    return "";
};

export const validateYear = (year: string) => {
    if (!year.trim()) return "Rok jest wymagany.";
    if (!yearRegex.test(year)) return "Rok musi być w zakresie 1900-2099.";
    return "";
};



