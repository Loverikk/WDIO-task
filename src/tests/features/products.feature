@smoke @products
Feature: Categories on the product page

Background: Given I am on the product page

Scenario: Filter products by "Power Tools" category
    When I click "Categories" dropdown
    And I select "Power tools" from the list
    Then I should see a list of power tools displayed
    And the header should be "Category: Power Tools"

Scenario: Filter products by "Low-High" price category
    When I click "Sort by" dropdown
    And I select the category
    Then I should see the product list
    And I should see the category displayed in the field
