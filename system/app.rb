require 'rubygems'
require 'sinatra'
require 'mail'

class App < Sinatra::Base

  get '/' do
    'Consensus'
  end

  get '/SendPropose' do
  end


  Mail.defaults do
    delivery_method :smtp, {
      address: 'smtp.sendgrid.net',
      port: 25,
      user_name: 'apikey',
      password: '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'
    }
  end


  get '/send-mail' do
    mail = Mail.new do
      from    'hola@devscola.org'
      to      'elenamg31@gmail.com'
      subject 'This is a test email'
      content_type 'text/html; charset=UTF-8'
      body    '<h1>Hello</h1>'
    end
    body mail.to_s
    mail.deliver!
  end
end
