class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?, :find_service
   
private
        def current_user
            @user ||= User.find(session[:user_id]) #if logged_in?
        end

        def logged_in?
            if current_user.nil? 
                redirect_to '/'
            else
                current_user.id = session[:user_id]
            end
        end

        def find_service
            if current_user
                @business_service = BusinessService.find_by(id: params[:id])
    
            else
                redirect_to business_services_path
            end
        end

        def find_service_for_client
            @business_service = BusinessService.find_by(id: params[:business_service_id])
        end

        def find_client_scope
            @potential_client = PotentialClient.find_client(params).last
        end
    
end
