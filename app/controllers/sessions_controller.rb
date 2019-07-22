class SessionsController < ApplicationController


    def new
        @user = User.new
        render :login
        
    end
    
    def create
        # binding.pry
        @user = User.find_by(username: params[:user][:username])
        if @user && @user.authenticate(params[:user][:password])
            session[:user_id] = @user.id
            redirect_to user_path(@user)
        else
            #need to add flash[alert] message
            #use redirect here vs render to avoid errors in the form_for
            
            flash[:error] = "Sorry, your username or password was incorrect."
            redirect_to '/'

        end
    end

    def home
    end

    #logout
    def destroy
        session.clear
        flash[:notice] = "You have logged out successfully!"
        redirect_to '/'
    end

end
