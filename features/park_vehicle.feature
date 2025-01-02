Feature: Park a vehicle

  Background:
    Given a fleet for parking "fleet1"
    And a vehicle with plate number "ABC-123"
    And this vehicle is registered in the fleet

  Scenario: Successfully park a vehicle
    Given a location with latitude "48.8566", longitude "2.3522", and altitude "35"
    When I park this vehicle at this location
    Then the location of the vehicle should be "48.8566, 2.3522, 35"

  Scenario: Can't localize my vehicle to the same location twice
    Given a location with latitude "48.8566", longitude "2.3522", and altitude "35"
    And the vehicle is already parked at this location
    When I try to park this vehicle at the same location
    Then I should see an error for parking "Vehicle is already localized at this location."
