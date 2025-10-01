Test cases:
Feature: Authorization
    Background:
        Given I am on the login page

    Scenario: Log in with empty fields
        Given the email field is empty
        And the password field is empty
        When I click the "Log in" button
        Then I should see the error message "Email is required" 
        And I should see the error message "Password is required"

    Scenario: Log in with the invalid Email
        When I enter an invalid email 
        And I enter a valid password
        And I click the "Log in" button
        Then I should see an error message "Invalid Email or Password"
    
    Scenario: Log in with the invalid Password
        When I enter a valid email 
        And I enter an invalid password
        And I click the "Log in" button
        Then I should see an error message "Invalid Email or Password"

    Scenario: Log in with the valid credentials
        When I enter a valid email
        And I enter a valid password
        And I click the "Log in" button
        Then I should be redirected to "My account" page
        And I should see my Account details    
    
    Scenario: Reveal the password using the "Eye" icon
        When I enter a dummy password
        And the password is masked with asterisks
        And I click the "Eye" icon
        Then the password should be displayed as plain text

    Scenario: Attempt to restore a password with an empty email field
        When I click the "Forgot your password" link
        And I am redirected to "Forgot your password" page
        And I leave the email field empty
        And I click the "Set new password" button
        Then I should see an error "Email is required"

Feature: Categories on the product page
    Background:
        Given I am on the product page

    Scenario: Filter products by "Power Tools" category
        When I click "Categories" dropdown
        And I select "Power tools" from the list
        Then I should see a list of power tools displayed
        And the header should be "Category: Power Tools"
    
    Scenario: Filter products by "Low-High" price category
        When I click "Sort by" dropdown
        And I select "Price(Low-High)" from the list
        Then I should see the product list sorted in increasing price order
        And I should see "Price(Low-High)" displayed in the dropdown.