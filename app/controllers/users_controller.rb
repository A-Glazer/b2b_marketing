class UsersController < ApplicationController
    before_action :logged_in?, only: [:show]
    before_action :current_user, only: [:show]

    #loading the signup form
    def new
        @user = User.new
    end
    
    #signup
    def create
        @user = User.new(user_params)
        if params[:user][:password] == params[:user][:password_confirmation]
            if @user.save
                session[:user_id] = @user.id
                redirect_to user_path(@user)
            else
                render :new
            end
        else
            flash[:error] = "Password and password confirmation must match."
            redirect_to signup_path 
        end
    end


    def show
        @potential_client = @user.potential_clients
        @business_service = @user.business_services
        # @business_services = BusinessService.all
        # respond_to do |format|
        #     format.html
        #     format.json { render json: @business_services}
        # end
    end

    private 

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
