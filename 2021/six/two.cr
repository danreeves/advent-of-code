class Lanternfish
  EMPTY = [0, 0, 0, 0, 0, 0, 0, 0, 0] of Int64
  @fish = [] of Int64
  @next_fish = [] of Int64

  def initialize
    @fish = EMPTY.clone
    @next_fish = EMPTY.clone
  end

  def add_fish(age : Int64)
    @fish[age] += 1
  end

  def tick
    @next_fish = EMPTY.clone

    @fish.each_with_index do |v, i|
      next_i = (i == 0 ? 6 : (i - 1) % @fish.size)
      @next_fish[next_i] += v
      if i == 0
        @next_fish[8] = v
      end
    end

    @fish = @next_fish
  end

  def tick_days(days : Int32)
    days.times do
      tick
    end
  end

  def size
    @fish.sum
  end
end

fish = Lanternfish.new
File.read("./input.txt").split(',').each do |s|
  fish.add_fish s.to_i64
end

fish.tick_days 256

puts fish.size
