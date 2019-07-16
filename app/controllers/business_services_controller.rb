class BusinessServicesController < ApplicationController
   def new
    @service = BusinessService.new
   end

   def create
    # binding.pry
    @service = current_user.business_services.build(service_params)
    
        if @service.save

            redirect_to business_service_path(@service)
        else
            render :new
        end
   end

    def show
        # binding.pry
        @user = BusinessService.find(params[:id]).user
        @potential_client = BusinessService.find(params[:id]).potential_client_id
        @service = BusinessService.find(params[:id])
            # if @potential_client != nil
            #     @potential_client
            # end 
        @potential_clients = PotentialClient.all  
        # binding.pry  
    end

    def index
        @services = BusinessService.all
    end

    private
    def service_params
        params.require(:business_service).permit(:name, :description, :user_id, :potential_client_id)
    end
end
