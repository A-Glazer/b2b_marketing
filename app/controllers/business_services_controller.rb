class BusinessServicesController < ApplicationController
    before_action :logged_in?, :current_user 
    before_action :find_service, only: [:show, :edit, :update, :destroy]

   def new
    @business_service = BusinessService.new
   end

   def create
    @business_service = current_user.business_services.build(service_params)
# binding.pry
        if @business_service.save
            # redirect_to business_service_path(@business_service)
            render json: @business_service, status: 201
        else
            # flash[:alert] = "Please type in a business name."
            # redirect_to new_business_service_path
            render json: { errors: @business_service.errors.full_message }, status: :bad_request
        end
    end

    def show
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
        # @business_services = BusinessService.all
        # @user = current_user          
        
        @business_services = BusinessService.all
        respond_to do |format|
            format.html
            format.json { render json: @business_services}
        end
   
        # render json: business_services 
    end

    def edit
    end

    def update
        if @business_service.update(service_params)
            redirect_to business_service_path(@business_service)
        else
            render :edit
        end
    end

    def destroy
        @business_service.destroy
        redirect_to business_services_path
    end

    private

    def service_params
        params.require(:business_service).permit(:name, :description, :user_id, :potential_client_id)
    end

end
