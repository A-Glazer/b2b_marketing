class BusinessServicesController < ApplicationController
   def new
    @business_service = BusinessService.new
   end

   def create
    # binding.pry
    @business_service = current_user.business_services.build(service_params)
    
        if @business_service.save
            # service_clients(@business_service.id)
            # binding.pry
            redirect_to business_service_path(@business_service)
        else
            render :new
        end
   end

    def show
        find_service
        @business_service = BusinessService.find_by(id: params[:id])
        # @potential_client = BusinessService.find(params[:id]).potential_client
        # @potential_clients = @business_service.potential_client
        # binding.pry
        @potential_clients = PotentialClient.all  
        # binding.pry
        @potential_client = PotentialClient.new(business_service_id: @business_service.id)
        # binding.pry  
    end

    def index
        @business_services = BusinessService.all
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
        @business_service = BusinessService.find_by(id: params[:id])
        if !@business_service
            redirect_to business_services_path
        end
    end

    def service_params
        params.require(:business_service).permit(:name, :description, :user_id, :potential_client_id)
    end

    # def self.service_clients(id)
    #     @service_clients = []
    # end
end
