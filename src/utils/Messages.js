export const ALL_WORK_CATEGORY_MSG = "No work categories were located";
export const SINGLE_WORK_CATEGORY_MSG = "Unable to locate specified work category";
export const NOTIFICATION_MSG = "No notifications found";
export const WORK_HISTORY_MSG = "Work history data not available";
export const ONGOING_JOB_MSG = "Ongoing job details not found";
export const UPCOMING_JOB_MSG = "No upcoming jobs found";
export const HIRE_REQUEST_MSG = "No hire requests found";
export const EXPERIENCE_MSG = "Experience data is unavailable";

// Define different types of messages
const messages = {
    success: {
        add: "Added successfully!",
        update: "Updated successfully!",
        delete: "Deleted successfully!"
    },
    error: {
        add: "Error occurred while adding.",
        update: "Error occurred while updating.",
        delete: "Error occurred while deleting."
    }
};

// Function to display messages
export const ShowMessage = (type, action, title) => {
    const message = messages[type][action];
    if (title) {
        return `${title} ${message}`
    } else {
        return message
    }
}


