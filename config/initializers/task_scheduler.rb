=begin
require 'rubygems'
require 'rufus-scheduler'

s = Rufus::Scheduler.start_new

s.every("1s") do
        puts 'Horas: ' + Time.now.to_s
end
=end
