require 'net/http'
require 'rspec'
require_relative '../app.rb'

describe 'System' do
  it 'is up' do
    uri = URI('http://localhost:4567')

    response = Net::HTTP.get_response(uri)

    expect(response.code).to eq("200")
  end
end

describe 'Email' do
  it 'subject has first six words of the proposal' do

    proposal = "En mi opinion deberiamos de crear una funcion que determine el uso del mail"
    subject = first_six_words(proposal)

    expect(subject).to eq("En mi opinion deberiamos de crear...")
  end

  it 'subject finished when the sentence finds a dot, <br>, or </p> tag and has a maximum of six words' do

    proposal = "La propuesta esta creada. Consiste en esto."
    proposal1 = "La propuesta esta creada<br>"
    proposal2 = "<p>propuesta</p><p></p><p>con br y p<br> Consiste en esto<p>"

    expect(first_six_words(proposal)).to eq("La propuesta esta creada.")
    expect(first_six_words(proposal1)).to eq("La propuesta esta creada...")
    expect(first_six_words(proposal2)).to eq("propuesta...")
  end
end
