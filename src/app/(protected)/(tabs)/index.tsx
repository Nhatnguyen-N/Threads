import PostListItem from "@/components/PostListItem";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const { data } = await supabase
    .from("posts")
    .select("*,user:profiles(*)")
    .throwOnError();
  return data;
};

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
}
