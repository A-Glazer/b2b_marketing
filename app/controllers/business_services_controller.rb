class BusinessServicesController < ApplicationController
    before_action :logged_in?, :current_user

   def new
    @business_service = BusinessService.new
   end

   def create
    @business_service = current_user.business_services.build(service_params)

        if @business_service.save
            redirect_to business_service_path(@business_service)
        else
            flash[:alert] = "Please type in a business name."
            redirect_to new_business_service_path
        end
   end

    def show
        find_service
        @potential_clients = [] 

        @all_clients = PotentialClient.all
            @all_clients.each do |client|
                if client.business_service_id == @business_service.id
                    if !@potential_clients.include?(client) 
                        @potential_clients << client
                    end
                end
            end
        @potential_client = PotentialClient.new(business_service_id: @business_service.id)
    end

    def index
        @business_services = BusinessService.all
        @user = current_user            
    end

    def edit
        find_service
    end

    def update
        find_service
        if @business_service.update(service_params)
            redirect_to business_service_path(@business_service)
        else
            render :edit
        end
    end

    def destroy
        find_service
        @business_service.destroy
        redirect_to business_services_path
    end

    private

    def find_service
        if current_user
            @business_service = BusinessService.find_by(id: params[:id])

        else
            redirect_to business_services_path
        end
    end

    def service_params
        params.require(:business_service).permit(:name, :description, :user_id, :potential_client_id)
    end

end
