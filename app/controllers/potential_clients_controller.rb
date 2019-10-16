class PotentialClientsController < ApplicationController
    before_action :logged_in?, :current_user
    before_action :find_service_for_client, only: [:new, :create, :index, :edit, :update]
    before_action :find_client_scope, only: [:show, :index, :edit, :update, :destroy]

    def new
        if params[:business_service_id] && !BusinessService.exists?(params[:business_service_id])
            redirect_to business_services_path
        else
            @potential_client = PotentialClient.new(business_service_id: params[:business_service_id])
        end
    end

    def create
        # @business_services = BusinessService.all
        @business_service = BusinessService.find(params[:business_service_id])
        @potential_client = PotentialClient.new(client_params)
        @potential_client.business_service_id = @business_service.id
        # binding.pry
        if @potential_client.save
            # respond_to do |f|
        # binding.pry
            render json: @potential_client
                # f.json {render json: @potential_client}
                # f.html {render :index}
            # end
            # binding.pry
            # redirect_to `business_service/@potential_client.id`
        end
        # else
            # render :index
        # end
    end

    def show
        @business_service = @potential_client.business_service_id
       
    end

    def index
        # @user = current_user          
        @business_services = BusinessService.all
        # binding.pry
        @potential_clients = PotentialClient.all

        # @potential_client = @business_service.potential_clients.build
        # binding.pry
        @business_service_id = params[:business_service_id]
        # if @user.id == @business_services.user_id
        @business_services.each do |service|
            if service.id == @business_service_id.to_i    
                # respond_to do |f|
                    # render json: @potential_clients
                    # f.json {render json: @potential_clients}
                render "potential_clients/index"
                # end
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
        # binding.pry
    end

    
    private
    def client_params
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting)
    end
    
end

# def created_before(date)
#     @created_before = self.created_before(date)
# end