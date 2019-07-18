class PotentialClientsController < ApplicationController
    def new
        @business_service = BusinessService.find(params[:business_service_id]) 
        @potential_client = @business_service.build_potential_client

        # @potential_client = PotentialClient.new
    end

    def create 
        # binding.pry
   
        @business_service = BusinessService.find(params[:business_service_id]) 
        @potential_client = @business_service.build_potential_client(client_params)

        # new_post = @author.posts.build(title: "Web Development for Cats")
        # @potential_client = PotentialClient.build(client_params)
        # binding.pry
        if @potential_client.save! 
            @business_service.save
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
