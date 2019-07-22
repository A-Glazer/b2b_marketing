class PotentialClientsController < ApplicationController
    def new
        @business_service = BusinessService.find_by(id: params[:business_service_id])
   
        # @potential_client = PotentialClient.new
    
# binding.pry
        if params[:business_service_id] && !BusinessService.exists?(params[:business_service_id])
            redirect_to business_services_path, alert: "Business service not found."
        else
            @potential_client = PotentialClient.new(business_service_id: params[:business_service_id])
        end
    end

    def create 
        # binding.pry
        # raise params.inspect
        @business_service = BusinessService.find_by(id: params[:business_service_id])
        # @business_service = BusinessService.find(params[:business_service_id])
        # @potential_client = @business_service.build_potential_client(client_params)
        @potential_client = PotentialClient.new(client_params)
        # @potential_client.business_service_id = @business_service.id
        # @potential_client.user_id = current_user.id
        
        if @potential_client
            @potential_client.business_services << @business_service unless @potential_client.business_services.include?(@business_service)
            # binding.pry
            @potential_client.save
            # @business_service.save
            # binding.pry
            redirect_to business_service_potential_client_path(@business_service.id, @potential_client)
        else
            render :new
        end
    end


    def show
        @potential_client = PotentialClient.find_by(id: params[:id])
        #binding.pry
        @business_service = @potential_client.business_service_id
        # @business_service = BusinessService.find_by(params[:business_service_id])
        # binding.pry
  
    end

    def index
        @potential_clients = PotentialClient.all
        @potential_client = PotentialClient.find_by(id: params[:id])
        @business_service = BusinessService.find_by(id: params[:business_service_id])
    end

    def edit
        @business_service = BusinessService.find_by(id: params[:business_service_id])
        find_client
    end

    def update
        @business_service = BusinessService.find_by(id: params[:business_service_id])
        find_client
        if @potential_client.update(client_params)
            redirect_to business_service_potential_client_path(@business_service, @potential_client)
        else
            render :edit
        end
    end

    def destroy
        find_client
        @potential_client.destroy
        redirect_to business_service_potential_clients_path(@business_service)
    end

    
    private
    def client_params
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting, :business_service_id)
    end

    def created_before(date)
        @created_before = self.created_before(date)
    end

    def find_service
        @business_service = BusinessService.find_by(id: params[:id])
    end

    def find_client
        @potential_client = PotentialClient.find_by(id: params[:id])
        if !@potential_client
            redirect_to business_service_potential_clients_path(@business_service)
        end
    end
end
