import { profilePage } from "../pages/profilePage";

let updatedEmail = null; // Track updated email globally

describe("Profile Edit Tests", () => {
    beforeEach(() => {
        cy.fixture("profileEditData").as("profileEditData");
        cy.visit(Cypress.env("login"));
        cy.get("@profileEditData").then((data) => {
            let loginEmail = data.user.email;
            let loginPassword = data.user.password;
            const email = updatedEmail || loginEmail; // Use updated email if available
            const password = loginPassword;
            cy.login(email, password);
        });
    });

    after(() => {
        // Wait some time to begin logging out
        cy.wait(3000);
        cy.get("@profileEditData").then((data) => {
            const email = data.invalid.email;
            // let loginEmail = data.user.email;
            cy.logout(); // Log out first
            const defaultPassword = data.user.password;
            const defaultEmail = data.user.email;

            cy.login(email, defaultPassword); // Log back in
            cy.wait(3000); // Wait for the login to complete
            profilePage
                .navigateToProfile()
                .updateEmail(defaultEmail) // Revert the email
                .updateFullName("Ha Trinh") // Revert the name
                .clickUpdateProfileButton(); // Click the update button

            updatedEmail = null; // Reset the updated email after reverting
        });
        cy.logout();
    });

    it("Verify successful profile edit with both fields updated", () => {
        cy.get("@profileEditData").then((data) => {
            profilePage.navigateToProfile();
            profilePage
                .updateFullName(data.valid[2].fullName)
                .updateEmail(data.valid[2].email)
                .clickUpdateProfileButton();

            profilePage
                .isNotificationCorrect(data.valid[2].successMessage)
                .isFullNameCorrect(data.valid[2].fullName)
                .isEmailCorrect(data.valid[2].email);

            updatedEmail = data.valid[2].email; // Save updated email for subsequent tests
        });
    });

    it("Verify successful profile edit with only name updated", () => {
        cy.get("@profileEditData").then((data) => {
            profilePage.navigateToProfile();
            profilePage
                .updateFullName(data.valid[0].fullName)
                .clickUpdateProfileButton();

            profilePage
                .isNotificationCorrect(data.valid[0].successMessage)
                .isFullNameCorrect(data.valid[0].fullName);
        });
    });

    it("Verify successful profile edit with only email updated", () => {
        cy.get("@profileEditData").then((data) => {
            profilePage.navigateToProfile();
            profilePage.updateEmail(data.valid[1].email).clickUpdateProfileButton();

            profilePage
                .isNotificationCorrect(data.valid[1].successMessage)
                .isEmailCorrect(data.valid[1].email);

            updatedEmail = data.valid[1].email; // Save updated email for subsequent tests
        });
    });

    // Negative tests, failed
    it("Verify that fields cannot be left blank", () => {
        cy.get("@profileEditData").then((data) => {
            profilePage
                .navigateToProfile()
                .clearFullName()
                .clearEmail()
                .clickUpdateProfileButton()
                .isNotificationCorrect(data.invalid.blankFieldError);
        });
    });

    // Negative tests, failed
    it("Verify email format validation", () => {
        cy.get("@profileEditData").then((data) => {
            profilePage.navigateToProfile();
            profilePage
                .updateEmail(data.invalid.email)
                .clickUpdateProfileButton()
                .isNotificationCorrect(data.invalid.emailError);
        });
    });
});
