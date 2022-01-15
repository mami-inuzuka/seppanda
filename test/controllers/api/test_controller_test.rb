require "test_helper"

class Api::TestControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_test_index_url
    assert_response :success
  end
end
