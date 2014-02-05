class UserMailer < ActionMailer::Base

  default from: 'yniznik@gmail.com'
 
  def welcome_user(user)
    @user = user
    @url  = 'http://vitriol.herokuapp.com'
    mail(to: @user.email, subject: 'Welcome to Vitriol App Demo!')
  end

end
