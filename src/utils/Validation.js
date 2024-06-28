
export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const ValidateLogin = (obj) => {
    const errors = {};
    if (!obj.email) {
        errors.email = "Please provide a email.";
    }
    if (obj.email && !validateEmail(obj.email)) {
        errors.email = "Please enter valid email.";
    }
    if (!obj.password) {
        errors.password = "Please provide a password.";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export const IsValidPassword = (password) => {
    // Check if the password contains at least 6 characters
    if (password?.length < 6) {
        return false;
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Check if the password contains at least one number
    if (!/\d/.test(password)) {
        return false;
    }

    // If all conditions are met, return true
    return true;
}


export const ValidateCategory = (obj) => {
    const errors = {};
    if (!obj.category_name) {
        errors.category_name = "Please provide a category name.";
    }
    if (!obj.category_description) {
        errors.category_description = "Please provide a category description.";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export const ValidateService = (obj) => {
    const errors = {};
    if (!obj.service_name) {
        errors.service_name = "Please provide a service name.";
    }
    if (obj.service_description && obj.service_description === '[""]') {
        errors.service_description = "Please provide a service description.";
    }
    if (!obj.category_id) {
        errors.category_id = "Please provide a category ";
    }
    if (!obj.service_image) {
        errors.service_image = "Please provide a service image ";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}




export const ValidateChangePassword = (obj) => {
    console.log(obj)
    const errors = {};
    if(obj.old_password===obj.confirm_new_password) {
        errors.confirm_new_password = "use different password";
    }

    if(obj.new_password!==obj.confirm_new_password) {
        errors.confirm_new_password = "password mismatched";
    }
    if (!obj.old_password) {
        console.log("first")
        errors.old_password = "Please provide a old password.";
    }
    if (!obj.new_password) {
        errors.new_password = "Please provide a new password.";
    }
    
    if (!obj.confirm_new_password) {
        errors.confirm_new_password = "Please provide a confirm password.";
    }
   
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export const ValidateUpdate = (obj1, obj2) => {
    const errors = {};
    console.log(obj1 , obj2)
    if (obj1.full_name===obj2.full_name&&obj1.email===obj2.email&&obj1.phone===obj2.phone) {
        errors.full_name = "Please provide a different name.";
        errors.email = "Please provide a different email.";
        errors.phone = "Please provide a different phone number.";
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export const ValidateEmployee = (obj) => {
    const errors = {};
    if (!obj.email) {
        errors.email = "Please provide a email.";
    }
    
    if (!obj.phone) {
        errors.phone = "Please provide a phone number.";
    }

    if (!obj.full_name) {
        errors.full_name = "Please provide a name.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}