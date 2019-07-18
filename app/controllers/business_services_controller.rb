class BusinessServicesController < ApplicationController
   def new
    @business_service = BusinessService.new
   end

   def create
    # binding.pry
    @business_service = current_user.business_services.build(service_params)
    
        if @business_service.save

            redirect_to business_service_path(@business_service)
        else
            render :new
        end
   end

    def show
        @user = BusinessService.find(params[:id]).user
        @business_service = BusinessService.find(params[:id])
        # @potential_client = BusinessService.find(params[:id]).potential_client
        # @potential_clients = @business_service.potential_client
        binding.pry
        @potential_clients = PotentialClient.all  

        # binding.pry  
    end

    def index
        @business_services = BusinessService.all
    end

    private
    def service_params
        params.require(:business_service).permit(:name, :description, :user_id, :potential_client_id)
    end
end
