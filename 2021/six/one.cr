class Lanternfish
  PERIOD           = 6
  FIRST_PERIOD_MOD = 2

  def initialize(remaining : Int32)
    @remaining = remaining
  end

  def remaining
    @remaining
  end

  def tick
    @remaining = @remaining - 1

    if @remaining < 0
      @remaining = PERIOD
      Lanternfish.new PERIOD + FIRST_PERIOD_MOD
    end
  end
end

fish = File.read("./input.txt").split(',').map do |s|
  Lanternfish.new s.to_i
end

days_to_sim = 80

days_to_sim.times do
  new_fish = [] of Lanternfish
  fish.each do |f|
    baby = f.tick
    if baby
      new_fish << baby
    end
  end
  fish.concat new_fish
end

puts fish.size
