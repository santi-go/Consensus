require 'net/http'
require 'rspec'

describe 'App' do
  it 'is up' do
    uri = URI('http://localhost:4567')

    response = Net::HTTP.get_response(uri)

    expect(response.code).to eq("200")
  end
end
