# frozen_string_literal: true

# rubocop:disable RSpec/AnyInstance

module FirebaseStub
  def stub_firebase(user)
    allow_any_instance_of(Firebase::Auth::Authenticable).to receive(:authenticate_entity).and_return(user)
  end

  def stub_authenticate_new_user
    user_info = {
      'name' => 'Alice',
      'email' => 'alice@example.com',
      'sub' => '12345'
    }
    allow_any_instance_of(Api::Auth::RegistrationsController).to receive(:payload).and_return(user_info)
  end
end
