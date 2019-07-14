class BusinessServicesController < ApplicationController
   def new
    @service = BusinessService.new
   end

   def create
    @service = BusinessService.new(service_params)
#not working
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
