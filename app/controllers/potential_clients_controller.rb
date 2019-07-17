class PotentialClientsController < ApplicationController
    def new
        # binding.pry
        @service = BusinessService.find(params[:business_service_id]) 
        @client = @service.build_potential_client
        # binding.pry
        # @client = PotentialClient.new
    end

    def create
        # binding.pry
   
        @service = BusinessService.find(params[:business_service_id]) 
        @client = @service.build_potential_client(client_params)

        if @client.save! 
            @service.save
            redirect_to business_service_potential_client_path(@service, @client)
        else
            render :new
        end
    end


    def show
        @client = PotentialClient.find_by(id: params[:id])
        # binding.pry
        @service = BusinessService.find(params[:business_service_id])
        # binding.pry
  
    end

    def index
        @clients = PotentialClient.all
    end

    def created_before(time)
        @created_before = PotentialClient.created_before(Time.zone.now)
    end

    private
    def client_params
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting)
    end
end
