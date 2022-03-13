# frozen_string_literal: true

class API::UsersController < API::Auth::FirebaseAuthRailsController
  skip_before_action :authenticate_user
  include InvitationTokenAndTeamCapacityCheckable

  def create
    FirebaseIdToken::Certificates.request
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    @user = User.new(create_params)
    create_team_or_belongs_to_team
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
    if params[:avatar][:data].present?
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("#{decode(params[:avatar][:data])}\n"),
        filename: params[:avatar][:name]
      )
      @user.avatar.attach(blob)
    end
    if @user.update(update_params)
      render :update
    else
      render json: { messages: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def create_team_or_belongs_to_team
    invitation_token = request.headers[:InvitationToken]
    if invitation_token.present?
      team = Team.find_by!(invitation_token: invitation_token)
      @user.team_id = team.id
      @user.color = 'orange'
    else
      @invitation_token = SecureRandom.urlsafe_base64
      @user.build_team(invitation_token: @invitation_token)
      @user.color = 'blue'
    end
  end

  def update_params
    params.permit(:name)
  end

  def create_params
    params.permit(:name).merge(uid: payload['sub'])
  end
end
