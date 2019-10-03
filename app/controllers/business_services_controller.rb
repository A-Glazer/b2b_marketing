class BusinessServicesController < ApplicationController
    before_action :logged_in?, :current_user 
    before_action :find_service, only: [:show, :edit, :update, :destroy]
    
       def new
        @business_service = BusinessService.new
       end

    def index
        # @user = current_user          
        @business_services = BusinessService.all
        @potential_clients = PotentialClient.all
        # if @user.id == @business_services.user_id
            respond_to do |format|
                format.html {render :index}
                format.json { render json: @business_services}
            end
        # end
    end

    def show
        @all_clients = PotentialClient.all
        # binding.pry
        respond_to do |format|
            format.html {render :show}
            format.json { render json: @business_services}
        end
        
        # need to fix
        # @potential_clients = [] 
        #     @all_clients.each do |client|
        #         if client.business_service_id == @business_service.id
        #             if !@potential_clients.include?(client) 
        #                 @potential_clients << client
        #             end
        #         end
        #     end
        # @potential_client = PotentialClient.new(business_service_id: @business_service.id)
    end


   def create
    @business_service = current_user.business_services.build(service_params)
    # save not working
        if @business_service.save
            # redirect_to business_service_path(@business_service)
            respond_to do |format|
                format.html { render :new}
                format.json { render json: @business_service}
            end
        else
            # flash[:alert] = "Please type in a business name."
            # redirect_to new_business_service_path
            render json: { errors: @business_service.errors.full_message }, status: :bad_request
        end
# need to create save for potential clients
        @potential_client = PotentialClient.new(client_params)   
        
        if @potential_client
            @potential_client.business_services << @business_service unless @potential_client.business_services.include?(@business_service)
            @potential_client.save
            # redirect_to business_service_potential_client_path(@business_service.id, @potential_client)
            respond_to do |format|
                format.html {render :show}
                format.json (render json: @potential_client)
            end
        else
            render :show
        end

    end

   

    def edit
        @business_services = BusinessService.find(params["id"])
        respond_to do |format|
            format.html {render :edit}
            format.json { render json: @business_services}
        end
    end

    def update
        if @business_service.update(service_params)
            redirect_to business_service_path(@business_service)
        else
            render :edit
        end
    end

    def destroy
        @business_service.destroy
        redirect_to business_services_path
    end

    private

    def service_params
        params.require(:business_service).permit(:name, :description, :user_id, :potential_client_id)
    end

    def client_params
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting, :business_service_id)
    end

end
