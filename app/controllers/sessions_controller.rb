class SessionsController < ApplicationController

    def new
        @user = User.new
        render :login    
    end
    
    def create
        @user = User.find_by(username: params[:user][:username])
        if @user && @user.authenticate(params[:user][:password])
            session[:user_id] = @user.id
            redirect_to business_services_path
        else
            #use redirect here vs render to avoid errors in the form_for
            flash[:error] = "Sorry, your username or password was incorrect."
            redirect_to '/login'
        end
    end

    #omniauth facebook login
    def facebook_create
        @user = User.find_or_create_by_omniauth(auth)       
        session[:user_id] = @user.id
        redirect_to business_services_path
    end

    def home
    end

    #logout
    def destroy
        session.clear
        redirect_to '/'
    end

    private
 
  def auth
    request.env['omniauth.auth']
  end

end