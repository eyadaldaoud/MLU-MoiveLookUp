import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const Pagination = ({ page, totalPages = 100, setPage }: any) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const textColor = isDark ? "white" : "#1a1a1a";
  const activeColor = "#3b82f6"; // Blue color for active elements
  const disabledColor = isDark ? "#4b5563" : "#d1d5db";

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  // Navigate to specific page
  const goToPage = (newPage: number) => {
    const validPage = Math.max(1, Math.min(newPage, totalPages));
    setPage(validPage);
  };

  // Create array of page numbers to display
  const getPageNumbers = () => {
    let pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate middle range
      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const NavButton = ({
    onPress,
    disabled,
    icon,
    size = 24,
    accessibilityLabel,
  }: any) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`h-10 w-10 rounded-full flex items-center justify-center ${
        disabled ? "opacity-50" : "active:bg-gray-200 dark:active:bg-gray-700"
      }`}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {React.createElement<any>(
        icon === "skip-back" || icon === "skip-forward"
          ? Feather
          : MaterialIcons,
        {
          name: icon,
          size: size,
          color: disabled ? disabledColor : textColor,
        }
      )}
    </TouchableOpacity>
  );

  return (
    <View className="w-full p-4 flex flex-row items-center justify-center space-x-1">
      {/* First page button */}
      <NavButton
        onPress={() => goToPage(1)}
        disabled={isFirstPage}
        icon="skip-back"
        accessibilityLabel="First page"
      />

      {/* Previous page button */}
      <NavButton
        onPress={() => goToPage(page - 1)}
        disabled={isFirstPage}
        icon="navigate-before"
        size={28}
        accessibilityLabel="Previous page"
      />

      {/* Page numbers */}
      <View className="flex flex-row items-center mx-2">
        {getPageNumbers().map((pageNum, index) =>
          pageNum === "..." ? (
            <Text
              key={`ellipsis-${index}`}
              className="px-1 text-lg"
              style={{ color: textColor }}
            >
              ⋯
            </Text>
          ) : (
            <TouchableOpacity
              key={`page-${pageNum}`}
              onPress={() => goToPage(pageNum)}
              className={`h-8 w-8 mx-1 rounded-full flex items-center justify-center ${
                page === pageNum
                  ? "bg-blue-500"
                  : "active:bg-gray-200 dark:active:bg-gray-700"
              }`}
              accessibilityRole="button"
              accessibilityLabel={`Page ${pageNum}`}
              accessibilityState={{ selected: page === pageNum }}
            >
              <Text
                className="text-base font-medium"
                style={{ color: page === pageNum ? "white" : textColor }}
              >
                {pageNum}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Next page button */}
      <NavButton
        onPress={() => goToPage(page + 1)}
        disabled={isLastPage}
        icon="navigate-next"
        size={28}
        accessibilityLabel="Next page"
      />

      {/* Last page button */}
      <NavButton
        onPress={() => goToPage(totalPages)}
        disabled={isLastPage}
        icon="skip-forward"
        accessibilityLabel="Last page"
      />
    </View>
  );
};

export default Pagination;
