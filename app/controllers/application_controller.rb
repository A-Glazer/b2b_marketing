class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?
   
private
        def current_user
            @user ||= User.find(session[:user_id]) #if logged_in?
        end

        def logged_in?
            # if current_user.id != session[:user_id] || session[:user_id] == nil
            # # if session[:user_id] == nil || session[:user_id] != current_user.id
            #     redirect_to '/'
            # else
            #     current_user
            # end
            if current_user.nil? 
                redirect_to '/'
            else
                current_user.id = session[:user_id]
            end
        end
    
end
