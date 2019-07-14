class BusinessServicesController < ApplicationController
   def new
    @service = BusinessService.new
   end

   def create
    # binding.pry
    @service = current_user.business_services.build(service_params)
    # @service = current_user.business_services.new(params[:name])
#save and link not working - want it to link to the business service show page
        #need to make potential_client_id optional
        if @service.save
            redirect_to business_service_path(@service)
        else
            render :new
        end
   end

    def show
    end

    def index
        @services = BusinessService.all
    end

    private
    def service_params
        params.require(:business_service).permit(:name, :description)
    end
end
