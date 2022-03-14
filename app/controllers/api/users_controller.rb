# frozen_string_literal: true

class API::UsersController < API::AuthenticationController
  include InvitationTokenAndTeamCapacityCheckable
  before_action :check_invitation_token_and_team_capacity, only: %i[create]
  skip_before_action :authenticate_user, only: %i[create]

  def create
    FirebaseIdToken::Certificates.request
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    @user = User.new(create_params)
    @user.create_team_or_belongs_to_team(request.headers[:InvitationToken])
    @user.attach_avatar(params[:avatar][:data], params[:avatar][:name])
    if @user.save
      render :create
    else
      render json: { messages: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by(uid: payload['sub'])
    @user.name = params[:name]
    @user.attach_avatar(params[:avatar][:data], params[:avatar][:name]) if params[:avatar][:data].present?
    if @user.update(update_params)
      render :update
    else
      render json: { messages: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def create_params
    params.permit(:name).merge(uid: payload['sub'])
  end

  def update_params
    params.permit(:name)
  end
end
