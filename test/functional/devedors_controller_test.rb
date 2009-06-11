require 'test_helper'

class DevedorsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:devedors)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create devedor" do
    assert_difference('Devedor.count') do
      post :create, :devedor => { }
    end

    assert_redirected_to devedor_path(assigns(:devedor))
  end

  test "should show devedor" do
    get :show, :id => devedors(:one).id
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => devedors(:one).id
    assert_response :success
  end

  test "should update devedor" do
    put :update, :id => devedors(:one).id, :devedor => { }
    assert_redirected_to devedor_path(assigns(:devedor))
  end

  test "should destroy devedor" do
    assert_difference('Devedor.count', -1) do
      delete :destroy, :id => devedors(:one).id
    end

    assert_redirected_to devedors_path
  end
end
