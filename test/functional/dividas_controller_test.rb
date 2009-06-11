require 'test_helper'

class DividasControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dividas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create divida" do
    assert_difference('Divida.count') do
      post :create, :divida => { }
    end

    assert_redirected_to divida_path(assigns(:divida))
  end

  test "should show divida" do
    get :show, :id => dividas(:one).id
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => dividas(:one).id
    assert_response :success
  end

  test "should update divida" do
    put :update, :id => dividas(:one).id, :divida => { }
    assert_redirected_to divida_path(assigns(:divida))
  end

  test "should destroy divida" do
    assert_difference('Divida.count', -1) do
      delete :destroy, :id => dividas(:one).id
    end

    assert_redirected_to dividas_path
  end
end
