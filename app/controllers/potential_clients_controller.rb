class PotentialClientsController < ApplicationController
    before_action :logged_in?, :current_user
    before_action :find_service_for_client, only: [:new, :create, :index, :edit, :update]
    before_action :find_client_scope, only: [:show, :index, :edit, :update, :destroy]

    def new
        # binding.pry
        if params[:business_service_id] && !BusinessService.exists?(params[:business_service_id])
            redirect_to business_services_path
        else
            @potential_client = PotentialClient.new(business_service_id: params[:business_service_id])
        end
    end

    def create
        binding.pry
        # @splitURL=request.url.split(".json").join
        # @URL2 = @splitURL.split("/")
        # @business_service_id = @URL2.last.to_i

        # @business_service = BusinessService.find_by_id(@business_service_id)

        @business_service = BusinessService.find(params[:business_service_id])
        @potential_client = @business_service.potential_clients.new(client_params)
        @potential_client.save
        # render json: @potential_client
        redirect_to business_service_path(@business_service)
        
    end

    def show
        # binding.pry
        @business_service = @potential_client.business_service_id
       
    end

    def index
        # binding.pry
        @business_services = current_user.business_services
        @potential_clients = current_user.potential_clients
        @business_service_id = params[:business_service_id]
        @business_services.each do |service|
            if service.id == @business_service_id.to_i    
                render "potential_clients/index"
            end
        end      
    end

    def edit
    end

    def update
        if @potential_client.update(client_params)
            redirect_to business_service_potential_client_path(@business_service, @potential_client)
        else
            render :edit
        end
    end

    def destroy
        @potential_client.destroy
        redirect_to business_services_path
    end

    def meetings
        @meeting = PotentialClient.meeting_yes 
    end

    private
    
    def client_params
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting)
    end
    
end

