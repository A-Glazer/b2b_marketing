class PotentialClientsController < ApplicationController
    before_action :logged_in?, :current_user

    def new
        find_service
        if params[:business_service_id] && !BusinessService.exists?(params[:business_service_id])
            redirect_to business_services_path
        else
            @potential_client = PotentialClient.new(business_service_id: params[:business_service_id])
        end
    end

    def create 
        find_service
        @potential_client = PotentialClient.new(client_params)   
        
        if @potential_client
            @potential_client.business_services << @business_service unless @potential_client.business_services.include?(@business_service)
            @potential_client.save
            redirect_to business_service_potential_client_path(@business_service.id, @potential_client)
        else
            render :new
        end
    end


    def show
        @potential_client = PotentialClient.find_client(params).last #scope being called
        # @potential_client = PotentialClient.find_by(id: params[:id])
        @business_service = @potential_client.business_service_id
    end

    #not for deployment, just for debugging
    def index
        @potential_clients = PotentialClient.all
        @potential_client = PotentialClient.find_client(params).last
        find_service
    end

    def edit
        find_service
        @potential_client = PotentialClient.find_client(params).last
    end

    def update
        find_service
        @potential_client = PotentialClient.find_client(params).last
        if @potential_client.update(client_params)
            redirect_to business_service_potential_client_path(@business_service, @potential_client)
        else
            render :edit
        end
    end

    def destroy
        @potential_client = PotentialClient.find_client(params).last
        @potential_client.destroy
        redirect_to business_services_path
    end

    
    private
    def client_params
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting, :business_service_id)
    end

    def created_before(date)
        @created_before = self.created_before(date)
    end

    def find_service
        @business_service = BusinessService.find_by(id: params[:business_service_id])
    end
end
