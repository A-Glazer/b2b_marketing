class BusinessServicesController < ApplicationController
    before_action :logged_in?, :current_user 
    before_action :find_service, only: [:show, :edit, :update, :destroy]
    
    def new
        @business_service = BusinessService.new
    end

    def index         
        @business_services = BusinessService.all
        @potential_clients = PotentialClient.all
            respond_to do |format|
                format.json { render json: @business_services}
                format.html { render :index}
            end
    end

    def show
        @all_clients = PotentialClient.all
        @business_service = BusinessService.find(params["id"])
        @potential_client = @business_service.potential_clients.build
        # binding.pry
        respond_to do |format|
            format.json { render json: @business_service}
            format.html { render :show }
        end
        # render json: @business_service
    end


    def create
    @business_service = current_user.business_services.build(service_params)
        if @business_service.save
            respond_to do |format|
                format.html { render new_business_service_path }
                format.json { render json: @business_service}
            end
        else
            render :new
        end
    end

    def edit
        @business_services = BusinessService.find(params["id"])
        respond_to do |format|
            format.json { render json: @business_services}
            format.html { render :edit}
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
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting)
    end

end
