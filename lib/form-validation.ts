export interface FormErrors {
  name?: string;
  email?: string;
  content?: string;
  general?: string;
}

export interface FormData {
  name: string;
  email: string;
  content: string;
}

// Validation rules
export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 50) {
    errors.name = "Name must be less than 50 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  } else if (data.email.length > 100) {
    errors.email = "Email must be less than 100 characters";
  }

  // Content validation
  if (!data.content.trim()) {
    errors.content = "Message is required";
  } else if (data.content.trim().length < 10) {
    errors.content = "Message must be at least 10 characters";
  } else if (data.content.trim().length > 1000) {
    errors.content = "Message must be less than 1000 characters";
  }

  return errors;
};

// Field validation for real-time feedback
export const validateField = (name: keyof FormData, value: string): string => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      if (value.trim().length > 50)
        return "Name must be less than 50 characters";
      return "";

    case "email":
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      if (value.length > 100) return "Email must be less than 100 characters";
      return "";

    case "content":
      if (!value.trim()) return "Message is required";
      if (value.trim().length < 10)
        return "Message must be at least 10 characters";
      if (value.trim().length > 1000)
        return "Message must be less than 1000 characters";
      return "";

    default:
      return "";
  }
};
