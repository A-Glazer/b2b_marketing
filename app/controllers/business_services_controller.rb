class BusinessServicesController < ApplicationController
    before_action :logged_in?, :current_user

   def new
    @business_service = BusinessService.new
   end

   def create

    @business_service = current_user.business_services.build(service_params)

        if @business_service.save
            # service_clients(@business_service.id)
            # binding.pry
            redirect_to business_service_path(@business_service)
        else
            flash[:alert] = "Please type in a business name."
            redirect_to new_business_service_path
        end
   end

    def show
        # binding.pry
        find_service
        # binding.pry
        # @business_service = BusinessService.find_by(id: params[:id])
        # @potential_client = BusinessService.find(params[:id]).potential_client
        # @potential_clients = @business_service.potential_client
        # binding.pry
        @potential_clients = [] 
        @all_clients = PotentialClient.all
            @all_clients.each do |client|
                # binding.pry
                if client.business_service_id == @business_service.id
                    if !@potential_clients.include?(client) 
                        @potential_clients << client
                    end
                end
            end
        # binding.pry
        @potential_client = PotentialClient.new(business_service_id: @business_service.id)
          

    end

    def index
        # if params[:user_id] && user = User.find_by(id: params[:user_id])
        @business_services = BusinessService.all
            # @business_services = user.business_services
            # binding.pry
        # end
        @user = current_user
        # binding.pry
            
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
        
            # if !@business_service
            #     redirect_to business_services_path
            # end
        else
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
