class PotentialClientsController < ApplicationController
    def new
        @business_service = BusinessService.find(params[:business_service_id]) 
        # if params[:business_service_id] && @business_service
        #     @potential_client = @business_service.potential_clients.build(client_params)
        # else     
            @potential_client = PotentialClient.new
        # end
    end

    def create 
        # binding.pry
        
        @business_service = BusinessService.find(params[:business_service_id]) 
        # @potential_client = @business_service.build_potential_client(client_params)
        @potential_client = PotentialClient.new(client_params)
        # @potential_client.business_service_id = @business_service.id
        # @potential_client.user_id = current_user.id
     
        if @potential_client.save! 
            @business_service.save
            # binding.pry
            redirect_to business_service_potential_client_path(@business_service, @potential_client)
        else
            render :new
        end
    end


    def show
        @potential_client = PotentialClient.find_by(id: params[:id])
        binding.pry
        @business_service = BusinessService.find(params[:business_service_id])
        # binding.pry
  
    end

    def index
        @potential_clients = PotentialClient.all
    end

    
    private
    def client_params
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting)
    end

    def created_before(date)
        @created_before = self.created_before(date)
    end
end
