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
        #/users/1 <<<< param = user.id 
        @user = current_user
        binding.pry
        # trying to show users potential clients
        @potential_client = @user.potential_clients
        # binding.pry
        @business_service = BusinessService.find_by(id: params[:id])
        # @potential_clients = BusinessServicePotentialClient.find_by(business_service_id: business_service.id)
    #    session[:user_id] = @user.id

    end

    # def included
    #     @user_include = User.included
    # end

    private 

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
