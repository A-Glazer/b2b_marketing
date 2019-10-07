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

    # def create 
    #     @potential_client = PotentialClient.new(client_params)   
        
    #     if @potential_client
    #         @potential_client.business_services << @business_service unless @potential_client.business_services.include?(@business_service)
    #         @potential_client.save
    #         redirect_to business_service_potential_client_path(@business_service.id, @potential_client)
    #     else
    #         render :new
    #     end
    # end

    def create
        @business_service = BusinessService.all
    
        binding.pry
            @potential_client = @business_service.potential_client.build(client_params)
            if @potential_client.save
                respond_to do |f|
                    f.html {render :index}
                    f.json {render json: @potential_client}
                end
            else
                render :index
            end
    end

    def show
        @business_service = @potential_client.business_service_id
       
    end

    #not for deployment, just for debugging
    def index
        # @user = current_user          
        @business_services = BusinessService.all
        # binding.pry
        @potential_clients = PotentialClient.all
        binding.pry
        # if @user.id == @business_services.user_id
            respond_to do |format|
                format.html {render :index}
                format.json { render json: @potential_clients}
            end
        # end
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
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting, :business_service_id)
    end
    
end

# def created_before(date)
#     @created_before = self.created_before(date)
# end