require 'rubygems'
require 'sinatra/base'
require 'mail'
require 'sinatra/cross_origin'
require 'json'

class App < Sinatra::Base

  Mail.defaults do
    delivery_method :smtp, {
      address: 'smtp.sendgrid.net',
      port: 25,
      user_name: 'apikey',
      password: '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'
    }
  end

  set :bind, '0.0.0.0'
  configure do
    enable :cross_origin
  end
  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end

  options "*" do
    response.headers["Allow"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Origin"] = "*"
  end

  post '/' do
    'Consensus'
  end

  post '/send-mail' do
    consensus_email = 'consensus@devscola.org'
    params = JSON.parse(request.body.read)
    circle = params['circle']
    proposer = params['proposer']
    consensus_to = circle + [proposer]
    consensus_body = params['proposal']
    consensus_subject = create_subject(consensus_body)

    mail = Mail.new
    mail.from = consensus_email
    mail.to = consensus_to
    mail.subject = consensus_subject
    mail.content_type = 'text/html; charset=UTF-8'
    mail.body = consensus_body

    mail.deliver!
  end
end
