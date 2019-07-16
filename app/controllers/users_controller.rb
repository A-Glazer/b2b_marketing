class UsersController < ApplicationController

    #loading the signup form
    def new
        @user = User.new
    end

    #signup
    def create
        @user = User.new(user_params)
        if @user.save
            session[:user_id] = @user.id
            redirect_to user_path(@user)
        else
            render :new
        end
    end


    def show
        # @client = PotentialClient.find_by(id: params[:id])
        # binding.pry
        # @service = BusinessService.find(params[:business_service_id])
    end

    private 

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
