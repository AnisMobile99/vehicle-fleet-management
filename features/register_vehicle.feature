Feature: Register a vehicle

  Scenario: I can register a vehicle
    Given a fleet for registration "fleet1"
    And a vehicle with plate number "ABC-123"
    When I register this vehicle into the fleet
    Then the fleet should contain the vehicle "ABC-123"

  Scenario: I can't register the same vehicle twice
    Given a fleet for registration "fleet1"
    And a vehicle with plate number "ABC-123"
    And this vehicle is already registered in the fleet
    When I register this vehicle into the fleet
    Then I should see an error "Vehicle already registered in this fleet."
