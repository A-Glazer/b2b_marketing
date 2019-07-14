class PotentialClientsController < ApplicationController
    def new
        @client = PotentialClient.new
    end

    def create
        # @client = current_user.potential_clients.build(client_params)
        @client = PotentialClient.new(client_params)

        if @client.save!
            redirect_to potential_client_path(@client)
        else
            render :new
        end
    end


    def show
        @client = PotentialClient.find_by(name: params[:name])
    end

    def index
        @clients = PotentialClient.all
    end

    private
    def client_params
        params.require(:potential_client).permit(:name, :last_contacted, :reply, :follow_up, :agreed_to_meeting)
    end
end
